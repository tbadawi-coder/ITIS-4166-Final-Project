import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma= new PrismaClient();

async function main() {

  //clear any existing data
  await prisma.loan.deleteMany();
  await prisma.bookAuthor.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.user.deleteMany();

  //hash password
  const password = await bcrypt.hash("Password123!", 10);

  //create users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      password,
      role: "admin",
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "Member User",
      email: "member@test.com",
      password,
      role: "member",
    },
  });

  //Create authors
  const author1= await prisma.author.create({
    data: {
      name: "Neil Gaiman",
      bio: "British author",
    },
  });

  const author2= await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      bio: "Harry Potter author",
    },
  });

  //create books
  const book1 = await prisma.book.create({
    data: {
      title: "Coraline",
      isbn: "111111",
      publishedYear: 2002,
      copiesAvailable: 3,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Harry Potter",
      isbn: "222222",
      publishedYear: 1997,
      copiesAvailable: 2,
    },
  });

  //book-Author relationships
  await prisma.bookAuthor.createMany({
    data:[
      { bookId: book1.id, authorId: author1.id },
      { bookId: book2.id, authorId: author2.id },
    ],
  });

  //create loans (an ownership example)
  await prisma.loan.create({
    data: {
      userId: member.id,
      bookId: book1.id,
      status: "borrowed",
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e)=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async ()=>{
    await prisma.$disconnect();
  });