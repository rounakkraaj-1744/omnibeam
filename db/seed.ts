import {drizzle} from "drizzle-orm/postgres-js"
import {eq} from "drizzle-orm"
import {users} from "./schema/auth"

const db = drizzle(process.env.DATABASE_URL!)

async function main (){
    const user: typeof users.$inferInsert = {
        id: "user@123",
        email: "a@a12.com",
        emailVerified: true,
        name: "Rounakk Raaj",
        image: "https://cdn.com/rounakk-raaj-sabat-image"
    }

    try{
        await db.insert(users).values(user);
        console.log ("User created successfully!")
    }
    catch(e){
        console.error ("Error creating user: ", e)
    }

    console.log ("All the users in the userTable: ");
    const allUsers = await db.select().from(users)
    console.log (allUsers)
}

main ()