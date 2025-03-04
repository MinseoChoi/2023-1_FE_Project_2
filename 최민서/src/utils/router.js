import { request } from "../api/api.js"

const ROUTE_EVENT_NAME = 'route-change'

export const initRoute = (onRoute) => {
    window.addEventListener(ROUTE_EVENT_NAME, async( e) => {
        const { type, id } = e.detail
        
        const { pathname } = window.location
        const [, documentId] = pathname.split('/')

        if (type === 'list' && documentId !== id){
            history.pushState(null, null, `/${id}`)
            onRoute(null)
        } else if(type === 'remove-btn'){
            await request(`/${id}`, {
                method : 'DELETE'
            })

            if (documentId === id) {
                history.pushState(null, null, '/')
            }

            onRoute(null)
        } else if (type.includes('add-btn')) {
            const createdDocument = await request('/', {
                method: 'POST',
                body: JSON.stringify({
                    title: '제목없음',
                    parent: id
                })
            })
            history.pushState(null, null, `${createdDocument.id}`)

            await request(`/${createdDocument.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: '',
                    content: ''
                })
            })
            onRoute(id)  
        } else if (type === 'header') {
            console.log('header')
            history.pushState(null, null, '/')
            onRoute(null)
        }
    })
}

export const push = (clickElement) => {
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT_NAME, {
        detail : {
            type : clickElement.type,
            id : clickElement.id
        }
    }))
}