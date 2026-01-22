const BASE_URL = "https://instagram.f8team.dev";

export const getAvatar = (user: any) => {
    const avatar = user?.profilePicture || user?.avatar

    if (!avatar) {
        return "/avaauto.jpg"
    }

    if (avatar.startsWith('http')) {
        return avatar
    }

    return `${BASE_URL}${avatar}`
};
