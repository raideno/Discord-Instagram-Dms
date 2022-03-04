export default async (instagram, userId) => {
    /*maybe add a try catch to avoid errors*/
    const user = await instagram.user.info(userId);
    return user;
}