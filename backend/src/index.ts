import { IoManager } from "./manager/IoManager";
import { UserManager } from "./manager/UserManager";




const io =  IoManager.getIo()
const userManager = new UserManager()

io.on('connection', (socket) => {
    userManager.addUser(socket);
  });

io.listen(3000);