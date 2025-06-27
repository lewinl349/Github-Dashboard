import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react';

export function LoginPage({ setReady }) {
    const [user, setUser] = useState("");

    function changeUser(e) {
        setUser(e.target.value);
    }

    const tokenReq = useMutation({
        mutationFn: async (data) => {
            const response = await fetch('http://localhost:3000/api/authenticate/user', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })

            // Wait for the POST request to return if it is complete
            const ready = await response.json();

            return ready;
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
                <legend className="fieldset-legend">Login with Username</legend>
                <label className="label text-sm">Only public and local repos.</label>

                <label className="label">Username</label>
                <input type="user" className="input"
                    placeholder="Enter your github username"
                    onChange={changeUser} />

                <button onClick={() => tokenReq.mutate({ method: "User", username: user })} className="btn btn-neutral mt-4">Login</button>
            </fieldset>
            <div className="divider lg:divider-horizontal"></div>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login with Github API Token</legend>
                <label className="label text-sm text-pretty">If you want to view private repos, make sure there is private repository read scope for the token.</label>

                <button onClick={() => tokenReq.mutate({ method: "Token", username: "" })} className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </div>
    )
}