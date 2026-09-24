"use client"
import Link from 'next/link'



const DeliveryHeader = (props) => {
    

    return (

        <>
            <div className="header-wrapper">
                <div>
                    <img style={{
                        width: "100px",
                        height: "100px",
                    }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-ysGap5km_i8-40sHFQPxqWF7cZubQrS2oueoqPoow&s=10" />
                </div>

                <ul >
                    <li >
                        <Link href="/"> Home</Link>
                    </li>
                 

                  


                </ul>
            </div>
        </>
    )
}

export default DeliveryHeader