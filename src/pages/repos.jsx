import '../app.css';
import Sidebar from '../components/Sidebar.jsx';
import githubLogo from '../assets/github-mark-white.svg';
import { useQuery } from '@tanstack/react-query';

// ================= Components ================
function RepoTable() {
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
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Description</th>
          <th>Languages Used</th>
          <th></th>
        </tr>
      </thead>
      {data.map((repo) => (
        <tbody>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={githubLogo}
                      alt="Custom repo icon" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{repo.name}</div>
                  <div className="text-sm opacity-50">Github User</div>
                </div>
              </div>
            </td>
            <td>
              {repo.desc}
            </td>
            <td>Python, Javascript</td>
            <th>
              <button className="btn btn-ghost btn-xs">Edit</button>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  )
}

// ================= Layout =================

export default function Repos() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <div className="text-3xl font-bold my-3">Your Repositories</div>
        <div className="overflow-x-auto">
          <RepoTable />
        </div>
      </div>
    </div>
  );
}