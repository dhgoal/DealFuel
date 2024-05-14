// pages/api/stats.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";

export async function GET(request) {
    await dbConnect();

    try {
        // Get today's date and calculate 6 days ago
        const today = new Date();
        const sixDaysAgo = new Date(today);
        sixDaysAgo.setDate(today.getDate() - 6);

        // Count total users
        const totalUsers = await UserProfile.countDocuments({});

        // Count users by plan type
        const basicUsers = await UserProfile.countDocuments({ Plan: 'Basic' });
        const premiumUsers = await UserProfile.countDocuments({ Plan: 'Premium' });

        // Calculate revenue based on plan type
        const totalRevenue = (basicUsers * 250) + (premiumUsers * 500);

        // Aggregation to get users and revenue per day over the last 7 days
        const dailyStats = await UserProfile.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: sixDaysAgo,
                        $lte: today
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    totalUsers: { $sum: 1 },
                    basicUsers: {
                        $sum: { $cond: [{ $eq: ["$Plan", "Basic"] }, 1, 0] }
                    },
                    premiumUsers: {
                        $sum: { $cond: [{ $eq: ["$Plan", "Premium"] }, 1, 0] }
                    },
                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$Plan", "Basic"] }, 250,
                                { $cond: [{ $eq: ["$Plan", "Premium"] }, 500, 0] }
                            ]
                        }
                    }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        // Aggregation to count users by country
        const usersByCountry = await UserProfile.aggregate([
            {
                $group: {
                    _id: "$country",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }  // Sort by count descending
            }
        ]);

        // Initialize arrays for the totals over 7 days
        const dailyTotalUsers = Array(7).fill(0);
        const dailyBasicUsers = Array(7).fill(0);
        const dailyPremiumUsers = Array(7).fill(0);
        const dailyRevenue = Array(7).fill(0);

        // Fill the daily data arrays
        dailyStats.forEach(day => {
            const index = Math.floor((new Date(day._id) - sixDaysAgo) / (1000 * 60 * 60 * 24));
            dailyTotalUsers[index] = day.totalUsers;
            dailyBasicUsers[index] = day.basicUsers;
            dailyPremiumUsers[index] = day.premiumUsers;
            dailyRevenue[index] = day.revenue;
        });

        const data = {
            totalUsers,
            basicUsers,
            premiumUsers,
            totalRevenue,
            dailyTotalUsers,
            dailyBasicUsers,
            dailyPremiumUsers,
            dailyRevenue,
            usersByCountry  // Add this to include the count of users per country
        };

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
