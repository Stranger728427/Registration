import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    postalAdd:string
}
