import Dashboard from './pages/dashboard';
import Repos from './pages/repos';
import Assistant from './pages/assistant';
import Sidebar from './components/sidebar.jsx';
import { TODOWindow } from './pages/editRepo.jsx';

export function ReposPage() {
    return (
        <div className="flex">
            <Sidebar />
            <Repos />
        </div>
    )
}

export function EditRepoPage() {
    return (
        <div className="flex">
            <Sidebar />
            <TODOWindow />
        </div>
    )
}

export function DashboardPage() {
    return (
        <div className="flex">
            <Sidebar />
            <Dashboard />
        </div>
    )
}

export function AssistantPage() {
    return (
        <div className="flex">
            <Sidebar />
            <Assistant />
        </div>
    )
}

export function NoPage() {
    return 'No page found at this link...';
}