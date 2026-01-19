const BASE_URL = "https://instagram.f8team.dev";

export const getAvatar = (profile: any) => {
    if (!profile?.profilePicture) {
        return "/avaauto.jpg"
    }

    if (profile.profilePicture.startsWith('http')) {
        return profile.profilePicture
    }

    return `${BASE_URL}${profile.profilePicture}`
};
