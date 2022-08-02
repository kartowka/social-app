import backendServiceAPI from 'services/backendServiceAPI'
import { messageProps, UserDataProps } from 'types'

export const createNewPost = async (userPost: messageProps, accessToken: string) => {
	const { data, ok } = await backendServiceAPI.post(
		'/post',
		{ userPost },
		{
			headers: {
				Authorization: `Bearer ${JSON.parse(accessToken)}`,
			},
		}
	)
	if (ok) {
		const { _id } = data as messageProps
		return _id
	}
}
export const getAllPostsByEmail = async (email: string, accessToken: string) => {
	const { data, ok } = await backendServiceAPI.get(
		`/post/${email}`,
		{},
		{
			headers: {
				authorization: `Bearer ${JSON.parse(accessToken)}`,
			},
		}
	)
	if (ok) {
		const posts = data as messageProps[]
		return posts
	}
}
export const deletePostByID = async (id: string, accessToken: string) => {
	const { data, ok } = await backendServiceAPI.delete(
		`/post/${id}`,
		{},
		{
			headers: {
				authorization: `Bearer ${JSON.parse(accessToken)}`,
			},
		}
	)
	return ok
}
export const updatePostByID = async (userPost: messageProps, accessToken: string) => {
	const { data, ok } = await backendServiceAPI.patch(`/post/${userPost._id}`, userPost, {
		headers: {
			authorization: `Bearer ${JSON.parse(accessToken)}`,
		},
	})
}
export const getAllPosts = async (accessToken: string) => {
	const { data, ok } = await backendServiceAPI.get(
		'/post',
		{},
		{
			headers: {
				authorization: `Bearer ${JSON.parse(accessToken)}`,
			},
		}
	)
	return data
}
