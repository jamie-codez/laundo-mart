import {useCallback, useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Table, TableBody, TableCell, TableHead} from "./ui/table";
import {TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, DeleteIcon, Plus, TrashIcon} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectValue} from "./ui/select";
import {SelectTrigger} from "@/components/ui/select.tsx";
import {toast} from "@/hooks/use-toast.ts";

type Ticket = {
    _id: string
    title: string
    description: string
    client: string
    status: string
    service: string
    createdAt: string
}

type TicketListProps = {
    initialTickets: Ticket[]
    totalTickets: number
    initialPage: number
}

export default function TicketList({ initialTickets, totalTickets, initialPage }: TicketListProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    const ticketsPerPage = 10
    const totalPages = Math.ceil(totalTickets / ticketsPerPage)

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
        // router.push(`/tickets?page=${newPage}`)
    }

    const handleCreateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newTicket = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            client: formData.get("client") as string,
            status: formData.get('status') as string,
            service: formData.get('service') as string,
            amount: formData.get('amount') as string,
        }
        const response = await fetch("http://localhost:3000/api/v1/tickets", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newTicket)
        })
        // const data = await response.json();
        if (response.ok){
            toast({title:"Ticket created successfully."})
        }else {
            toast({title:"Error creating ticket"})
        }
    }


    const deleteTicket = async (id:string)=>{
        const response = await fetch(`http://localhost:3000/api/v1/tickets/${id}`, {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await response.json();
        if (response.ok){
            toast({title:"Ticket deleted successfully."})
        }else {
            toast({title: data.message})
        }
    }


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-semibold text-foreground">Tickets</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{totalTickets} Total Tickets</Badge>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Ticket
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Ticket</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateTicket} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" required/>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea className={"border-2 rounded-sm px-2 py-1"} id="description" name="description" required/>
                                </div>
                                <div>
                                    <Label htmlFor="client">Client</Label>
                                    <Input id="cleint" name="client" required/>
                                </div>
                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" name="amount" type={"number"} required/>
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select name="status" defaultValue="in_progress">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="service">Service</Label>
                                    <Select name="service" defaultValue="laundry">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select service"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laundry">Laundry</SelectItem>
                                            <SelectItem value="dry_cleaning">Dry cleaning</SelectItem>
                                            <SelectItem value="cleaning">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit">Create Ticket</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="bg-background rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialTickets.map((ticket) => (<TableRow key={ticket._id} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">{ticket.title}</TableCell>
                                <TableCell className="font-medium">{ticket.client}</TableCell>
                                <TableCell className="font-medium">{ticket.service}</TableCell>
                                <TableCell>
                                    <Badge variant={ticket.status === 'close' ? 'default' : ticket.status === 'in_progress' ? 'secondary' : 'destructive'}>
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    sh.{ticket.amount}
                                </TableCell>
                                <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <TrashIcon onClick={()=> deleteTicket(ticket._id)}/>
                                </TableCell>
                            </TableRow>
                        ))}
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
                    <ChevronLeft className="h-4 w-4 mr-2" />
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
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}

