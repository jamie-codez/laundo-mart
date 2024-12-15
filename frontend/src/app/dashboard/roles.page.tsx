import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Suspense, useCallback, useEffect, useState} from "react";
import RolesList from "@/components/roles-list.tsx";
import {toast} from "@/hooks/use-toast.ts";

export const RolesPage = () => {
    const [users, setUsers] = useState<any>([]);

    const userList = useCallback(async () => {
        const response = await fetch("http://localhost:3000/api/v1/roles", {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (response.ok) {
            setUsers(data.data);
        } else {
            toast({title:data.message});
        }
    }, [users])

    useEffect(() => {
        userList().then()
        console.log(users);
    }, [])

    return (<div className="w-[80vw] h-svh mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
            <Suspense fallback={<UserListSkeleton/>}>
                <RolesList initialUsers={users} totalUsers={users.length} initialPage={1}/>
            </Suspense>
        </div>
    </div>)
}

function UserListSkeleton() {
    return (<div className="space-y-4">
        {Array.from({length: 10}).map((_, i) => (<div key={i} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-md">
            <Skeleton className="h-12 w-12 rounded-full"/>
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[250px]"/>
                <Skeleton className="h-4 w-[200px]"/>
            </div>
            <Skeleton className="h-8 w-20"/>
        </div>))}
    </div>)
}