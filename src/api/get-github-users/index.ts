import { Octokit } from 'octokit'
import useSWR from 'swr'

// super basic user type from GitHub

type User = {
    [key:string]: unknown
    id: number | string
    name: string
}

const octokit = new Octokit({
    auth: 'PONYTAIL'
})

const getGitHubUsers = async(querySearch: string) => {
    const res = await octokit.request('GET /search/users', {
    q: querySearch,
    per_page: 5,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
    
  })
    if (res.status !== 200) {
        console.error('Failed to fetch');
    }

    return {
        data: res.data.items as User[],
        error: undefined
    };
}

export const useUsers = (querySearch?: string) => {
    if(!querySearch){
        console.error('missing search param')
        return
    }
    const { data } = useSWR(querySearch, getGitHubUsers)

    console.log(data)
}