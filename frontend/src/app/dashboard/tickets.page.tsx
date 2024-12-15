import {Suspense, useCallback, useEffect, useState} from "react";
import TicketList from "@/components/ticket-list.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function TicketsPage() {
    const [tickets, setTickets] = useState([])
    const [error, setError] = useState([])

    const getTickets = useCallback(async () => {
        const response = await fetch("http://localhost:3000/api/v1/tickets",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (response.ok) {
            setTickets(data.data);
        }else {
            setError(data.message);
        }
    },[tickets])

    useEffect(() => {
        getTickets().then()
    },[])

    return (
        <div className="w-[80vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-lg shadow-lg p-6">
                <Suspense fallback={<TicketListSkeleton />}>
                    <TicketList initialTickets={tickets} totalTickets={tickets.length} initialPage={1} />
                </Suspense>
            </div>
        </div>
    )
}

function TicketListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-md">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            ))}
        </div>
    )
}

