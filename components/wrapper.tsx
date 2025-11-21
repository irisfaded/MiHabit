import { ReactNode } from "react";

export default function Wrapper({children}: {children: ReactNode}) {
    return (
        <div className='flex justify-center items-center w-full'>
            <div className="mt-4 flex flex-col justify-center lg:w-[35rem] w-full gap-2 px-4 mb-4">
                {children}
            </div>
        </div>
    )
}