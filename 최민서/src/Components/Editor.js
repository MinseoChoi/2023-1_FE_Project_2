export default function Editor({
    $target,
    initialState = {
        titile : '',
        content : ''
    },
    onEditing
}) {
    const $editor = document.createElement('div')

    $target.appendChild($editor)
    let isinitialize = false

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {
        if(!isinitialize){
            $editor.innerHTML = `
                <input type="text" name="title" class="editor-title" value="${this.state.title}" placeholder="제목 없음"/>
                <textarea name="content" class="editor-content" placeholder="여기에 내용을 입력해주세요">${this.state.content}</textarea>
            `
        }
        isinitialize = true
    }

    this.render()

    $editor.addEventListener('keyup', e => {
        const {target} = e
        const name = target.getAttribute('name')
        if (this.state[name]!==undefined) {
            const nextState = {
                ...this.state,
                [name] : target.value
            }

            this.setState(nextState)
            onEditing(this.state)
        }
    })

}