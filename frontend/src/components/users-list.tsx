import {useState} from "react";
import {ChevronLeft, ChevronRight, EditIcon, Plus, TrashIcon, Users} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

type User = {
    _id: string
    fullName: string
    email: string
    roles: any[]
}

type UserListProps = {
    initialUsers: User[]
    totalUsers: number
    initialPage: number
}

export default function UserList({initialUsers, totalUsers, initialPage}: UserListProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editFullName, setEditFullName] = useState<string>()
    const [editEmail, setEditEmail] = useState<string>()
    const [editRoles, setEditRoles] = useState<string>()
    const [editPassword, setEditPassword] = useState<string>("")
    const [editId, setEditId] = useState<string>("")
    // const _navigate = useNavigate();
    const usersPerPage = 10
    const totalPages = Math.ceil(totalUsers / usersPerPage)

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)

    }

    const handleCreateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const rolez = formData.get("roles") as string
        const rz = rolez.includes(",") ? rolez.split(",") : rolez
        const newTicket = {
            fullName: formData.get('fullName') as string,
            email   : formData.get('email') as string,
            roles   : rz,
            password: formData.get('password') as string
        }
        const response = await fetch("http://localhost:3000/api/v1/users", {
            method : "POST", headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }, body: JSON.stringify(newTicket)
        })
        const data = await response.json();
        if (response.ok) {
            toast({title: "User created successfully."})
        } else {
            toast({title: data.message})
        }

    }

    const handleUpdateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const rolez = formData.get("roles") as string
        const rz = rolez.includes(",") ? rolez.split(",") : rolez
        const newTicket:any = {
            fullName: formData.get('fullName') as string,
            email   : formData.get('email') as string,
            roles   : rz,
        }
        const password= formData.get('password') as string
        if (password) newTicket.password = password
        const response = await fetch(`http://localhost:3000/api/v1/users/${editId}`, {
            method : "PUT", headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }, body: JSON.stringify(newTicket)
        })
        const data = await response.json();
        if (response.ok) {
            toast({title: "User updated successfully."})
        } else {
            toast({title: data.message})
        }

    }

    const deleteUser = async (id: string) => {
        const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: "DELETE", headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await response.json();
        if (response.ok) {
            toast({title: "User deleted successfully."})
        } else {
            toast({title: data.message})
        }
    }

    return (<div>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary"/>
                <h2 className="text-2xl font-semibold text-foreground">Users</h2>
            </div>
            <div className="flex items-center space-x-4">
                <Badge variant="secondary">{totalUsers} Total Users</Badge>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2"/>
                            Create New User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateTicket} className="space-y-4">
                            <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" name="fullName" required/>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required/>
                            </div>
                            <div>
                                <Label htmlFor="roles">Roles (Separated by commas)</Label>
                                <Input id="roles" name="roles" required/>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" required/>
                            </div>
                            <Button type="submit">Create User</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateTicket} className="space-y-4">
                            <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" name="fullName" value={editFullName} onChange={e=>setEditFullName(e.target.value)} required/>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={editEmail} onChange={e=>setEditEmail(e.target.value)} type="email" required/>
                            </div>
                            <div>
                                <Label htmlFor="roles">Roles (Separated by commas)</Label>
                                <Input id="roles" name="roles" value={editRoles} onChange={e=>{setEditRoles(e.target.value)}} required/>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" value={editPassword} onChange={e=>setEditPassword(e.target.value)}/>
                            </div>
                            <Button type="submit">Save User</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
        <div className="bg-background rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialUsers.map((user) => (<TableRow key={user._id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.fullName}`} alt={user.fullName}/>
                                <AvatarFallback className="rounded-lg">{user.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className={"space-x-1"}>
                            {user.roles.map((role) => (<Badge variant={'outline'}>{role.name}</Badge>))}
                        </TableCell>
                        <TableCell className={"flex flex-row space-x-2"}>
                            <EditIcon className={"text-blue-500 h-5 w-5"} onClick={() => {
                                setIsEditDialogOpen(true);
                                setEditId(user._id)
                                setEditFullName(user.fullName)
                                setEditEmail(user.email)
                                setEditRoles(user.roles.map(r=>r.name).join())
                            }}/>
                            <TrashIcon className={"text-red-500 h-5 w-5"} onClick={() => deleteUser(user._id)}/>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
        <div className="flex justify-between items-center mt-6">
            <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
            >
                <ChevronLeft className="h-4 w-4 mr-2"/>
                Previous
            </Button>
            <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
            <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
            >
                Next
                <ChevronRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    </div>)
}

