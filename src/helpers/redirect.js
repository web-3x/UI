
export function gotoChat() {
    window.open(import.meta.env.VITE_APP_CHAT_URL + `?token=${localStorage.getItem('accessToken')}`, "_self");
}