import Dashboard from './pages/dashboard';
import Repos from './pages/repos';
import Assistant from './pages/assistant';
import { useQuery } from '@tanstack/react-query';

export function ReposPage() {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['reposList'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/repos/all',
            )
            return await response.json()
        },
    })

    if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Repos repos={data}/>
    )
}

export function DashboardPage() {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['langData'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/repos/langs',
            )
            return await response.json()
        },
    })

    if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Dashboard langs={data}/>
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