import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Activity, Users} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast.ts";
import UserList from "@/components/users-list.tsx";

export default function DashboardPage() {
  const [users, setUsers] = useState<any>([]);
  const [tickets, setTickets] = useState<any>([]);

  const userList = useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    const data = await response.json();
    if (response.ok) {
      setUsers(data.data);
    } else {
      toast({title:data.message})
    }
  }, [users])

  const ticketsList = useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/v1/tickets", {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    const data = await response.json();
    if (response.ok) {
      setTickets(data.data);
    } else {
      toast({title:data.message})
    }
  }, [users])

  useEffect(() => {
    userList().then()
    ticketsList().then()
    console.log(users);
  }, [])


  return (
      <div className={"space-y-6"}>
        <div className="w-[78vw] grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tickets
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(tickets.length * 0.8)}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className={"w-[78vw] p-5"}>
          <UserList initialUsers={users} totalUsers={users.length} initialPage={1}/>
        </Card>
      </div>)
}


