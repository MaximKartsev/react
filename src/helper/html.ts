export const removeHTMLTags = (text:string) => text.replace(/(<([^>]+)>)/gi, "")
