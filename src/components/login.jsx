import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react';
import { useReady } from "../scripts/loginContextHelper.jsx";

export function LoginPage() {
    const { setReady } = useReady();

    const hasGithubToken = useQuery({
        queryKey: ['gitToken'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/token/github',
            )
            return await response.json()
        },
        staleTime: 0
    });

    const hasOpenAIToken = useQuery({
        queryKey: ['openAIToken'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/token/openai',
            )
            return await response.json()
        },
        staleTime: 0
    });

    // Might be needed to send data when signing in
    const tokenReq = useMutation({
        mutationFn: async (data) => {
            const response = await fetch('http://localhost:3000/api/authenticate/user', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })

            // Wait for the POST request to return if it is complete
            const ready = await response.json();
        },
        onSuccess: () => {
            setReady(true);
            // Invalidate and refetch
            // aka refetch all data
            queryClient.invalidateQueries({ queryKey: ['reposList', 'langData', 'userdata'] })
        },
    })

    if (tokenReq.isPending) {
        return (
            <div className="flex justify-center h-screen">
                <span className="loading loading-spinner loading-xl text-primary"></span>
            </div>
        )
    }

    if (tokenReq.isError) {
        return (
            <div>Something went wrong... {tokenReq.error.message}</div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center py-[30vh]">
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Token Check</legend>
                <label className="label text-sm flex justify-between">
                    <p>(Required) Github API Token</p>
                    {
                        hasGithubToken.data ?
                            (<span className="badge badge-success">Verified</span>) :
                            (<span className="badge badge-warning">Invalid</span>)
                    }
                    
                </label>
                <label className="label text-sm flex justify-between">
                    <p>(Optional) OpenAI Token</p>
                    {
                        hasOpenAIToken.data ?
                            (<span className="badge badge-success">Verified</span>) :
                            (<span className="badge badge-warning">Invalid</span>)
                    }
                </label>
                <label className="label text-sm text-pretty">
                    Reopen application to refresh
                </label>

            </fieldset>
            <div className="divider lg:divider-horizontal"></div>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Unofficial Dashboard for Github</legend>
                <label className="label text-sm text-pretty">
                    If you want to include private repos,
                    add read scope for private repositories as well. Instructions are in the README.md!
                </label>

                <button onClick={() => tokenReq.mutate({ method: "Token" })} disabled={!hasGithubToken.data} className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </div>
    )
}