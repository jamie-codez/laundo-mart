import {useState} from "react";
import {ChevronLeft, ChevronRight, EditIcon, Plus, TrashIcon, Users} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "@/hooks/use-toast.ts";

type Role = {
    _id: string
    name: string
    description: string
    createdAt: string
}

type RoleListProps = {
    initialUsers: Role[]
    totalUsers: number
    initialPage: number
}

export default function RolesList({ initialUsers, totalUsers, initialPage }: RoleListProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const usersPerPage = 10
    const totalPages = Math.ceil(totalUsers / usersPerPage)
    const [editId,setEditId] = useState("")
    const [editTitle,setEditTitle] = useState("")
    const [editDescription,setEditDescription] = useState("")

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)

    }

    const handleCreateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newTicket = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
        }
        const response = await fetch("http://localhost:3000/api/v1/roles", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newTicket)
        })
        const data = await response.json();
        if (response.ok){
            toast({title:"Role created successfully."})
        }else {
            toast({title:data.message})
        }
    }

    const handleUpdateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newTicket = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
        }
        const response = await fetch(`http://localhost:3000/api/v1/roles/${editId}`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newTicket)
        })
        const data = await response.json();
        if (response.ok){
            toast({title:"Role update successfully."})
        }else {
            toast({title:data.message})
        }
    }

    const deleteRole = async (id:string)=>{
        const response = await fetch(`http://localhost:3000/api/v1/roles/${id}`, {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await response.json();
        if (response.ok){
            toast({title:"Role deleted successfully."})
        }else {
            toast({title:data.message})
        }
    }


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-primary"/>
                    <h2 className="text-2xl font-semibold text-foreground">Roles</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{totalUsers} Total Roles</Badge>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2"/>
                                Create Ticket
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Role</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateTicket} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required/>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea className={"border-2 rounded-sm px-2 py-1"} id="description" name="description" required/>
                                </div>
                                <Button type="submit">Create Role</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Role</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleUpdateTicket} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={editTitle} onChange={e=>setEditTitle(e.target.value)} required/>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea className={"border-2 rounded-sm px-2 py-1"} id="description" name="description" value={editDescription} onChange={e=>setEditDescription(e.target.value)} required/>
                                </div>
                                <Button type="submit">Save Role</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="bg-background rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>CreatedAt</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialUsers.map((user) => (<TableRow key={user._id} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="font-medium">{user.description}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell className={"flex flex-row space-x-2"}>
                                    <EditIcon className={"text-blue-500 h-5 w-5"} onClick={()=>{
                                        setIsEditDialogOpen(true)
                                        setEditId(user._id)
                                        setEditTitle(user.name)
                                        setEditDescription(user.description)
                                    }} />
                                    <TrashIcon className={"text-red-500 h-5 w-5"} onClick={()=>deleteRole(user._id)} />
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

