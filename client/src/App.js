import { useQuery } from 'react-query'

export default function App() {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('http://localhost:3001').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            {/*<strong>✨ {data.stargazers_count}</strong>{' '}*/}
            {/*<strong>🍴 {data.forks_count}</strong>*/}
        </div>
    )
}

