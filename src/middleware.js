import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const verifyAdminToken = async (request) => {
    const url = request.nextUrl.clone();
    const tokenObj = request.cookies.get('adminToken');

    console.log('Token from cookies:', tokenObj); // Log token object

    if (!tokenObj || !tokenObj.value) {
        console.log('No token found');
        url.pathname = '/admin-signin'; // Redirect to admin sign-in if no token
        return NextResponse.redirect(url);
    }

    const token = tokenObj.value; // Extract the token value

    try {
        // Verify the JWT token using jose
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.error('Invalid or expired token:', error);
        url.pathname = '/admin-signin'; // Redirect to admin sign-in if token is invalid or expired
        return NextResponse.redirect(url);
    }
};

// Main middleware function
export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin-panel')) {
        return verifyAdminToken(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-panel/:path*'], // Protect all routes under /admin-panel
};
