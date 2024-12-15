import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "@/providers/AuthContext.tsx";
import LoginPage from "@/app/login/login.page.tsx";
import ProtectedRoute from "@/components/protect.route.tsx";
import DashboardPage from "@/app/dashboard/dashboard.page.tsx";
import NotFound from "@/components/not-found.tsx";
import {SkeletonLayout} from "@/components/skeleton.layout.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {UsersPage} from "@/app/dashboard/users.page.tsx";
import TicketsPage from "@/app/dashboard/tickets.page.tsx";
import {RolesPage} from "@/app/dashboard/roles.page.tsx";

const App: React.FC = () => {
    return (<>
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={"/"} index element={<SkeletonLayout><DashboardPage/></SkeletonLayout>}/>
                        <Route path={"/dashboard"} index element={<SkeletonLayout><DashboardPage/></SkeletonLayout>}/>
                        <Route path={"/users"} element={<SkeletonLayout><UsersPage/></SkeletonLayout>}/>
                        <Route path={"/roles"} element={<SkeletonLayout><RolesPage/></SkeletonLayout>}/>
                        <Route path={"/tickets"} element={<SkeletonLayout><TicketsPage/></SkeletonLayout>}/>
                        <Route path={"/payments"} element={<SkeletonLayout>
                            <div className={"w-[80vw] flex justify-center items-center font-bold text-xl"}>Coming soon 😊</div>
                        </SkeletonLayout>}/>
                        <Route path={"/services"} element={<SkeletonLayout>
                            <div className={"w-[80vw] flex justify-center items-center font-bold text-xl"}>Coming soon 😊</div></SkeletonLayout>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </Router>
        <Toaster/>
    </>);
};

export default App;