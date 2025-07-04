import Dashboard from './pages/dashboard';
import Repos from './pages/repos';
import Assistant from './pages/assistant';

export function ReposPage() {
    return (
        <Repos />
    )
}

export function DashboardPage() {
    return (
        <Dashboard />
    )
}

export function AssistantPage() {
    return (
        <Assistant />
    )
}

export function NoPage() {
    return 'No page found at this link...';
}