import Chat from "../models/chat.model"

export const getMessages = async (req: any, res: any) => {
    console.log("Room")
    try {
        console.log("Room")
        const room = req.params.room;
        const user: any = await Chat.findAll({
            where:{
                room:room
            }
        });
        res.json(user);
    } catch(e) {
        res.status(500).json({message: "Internal server error"})
    }
}