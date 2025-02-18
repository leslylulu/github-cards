// // pages/api/proxy.js
// export default async function handler(req, res) {
// 	const { url } = req.query;
// 	const response = await fetch(url);
// 	const data = await response.buffer();
// 	res.setHeader('Content-Type', response.headers.get('Content-Type'));
// 	res.send(data);
// }