import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Column({ length: 30 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ length: 60 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ length: 30 })
  @IsString()
  @IsNotEmpty()
  password: string;
}
