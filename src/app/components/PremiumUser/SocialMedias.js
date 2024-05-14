import React from 'react';
import Image from 'next/image';


const SocialMedias = () => {
    return (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 10%", marginTop:16, backgroundColor:"#26262A"}}>
            <Image src="/calendlyLogo.png" alt="Icon 1" width={30} height={30} style={{cursor:"pointer"}}/>
            <Image src="/twitterLogo.png" alt="Icon 2" width={30} height={30} style={{cursor:"pointer"}} />
            <Image src="/linkedinLogo.png" alt="Icon 3" width={30} height={30} style={{cursor:"pointer"}} />
            <Image src="/instagramLogo.png" alt="Icon 4" width={30} height={30} style={{cursor:"pointer"}} />
        </div>
    );
};

export default SocialMedias;
