import {GalleryVerticalEnd} from "lucide-react"

import {LoginForm} from "@/components/login-form"
import {useAuth} from "@/providers/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function LoginPage() {
    const {isAuthenticated} = useAuth()

    return (<>
            {isAuthenticated ? <Navigate to="/" replace={true}/> :
             <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                 <div className="flex w-full max-w-sm flex-col gap-6">
                     <a href="#" className="flex items-center gap-2 self-center font-medium">
                         <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                             <GalleryVerticalEnd className="size-4"/>
                         </div>
                         Laundro Inc.
                     </a>
                     <LoginForm/>
                 </div>
             </div>}
        </>)
}