import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async findOne(id: number): Promise<Contact | undefined> {
    return await this.contactRepository.findOne({ where: { id } });
  }

  
  async findByField(field: Partial<{ phone: string; name: string }>): Promise<Contact | undefined> {
    return await this.contactRepository.findOne({ where: field });
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.preload({
      id,
      ...updateContactDto,
    });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return await this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
