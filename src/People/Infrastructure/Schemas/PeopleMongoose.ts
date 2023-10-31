import * as mongoose from 'mongoose';
import People from '../../Domain/Entities/People';
import { randomUUID } from 'crypto';
import IPeopleDomain from '../../Domain/Entities/IPeopleDomain';

export type PeopleMongooseDocument = Document & IPeopleDomain;

const PeopleSchema: any = new mongoose.Schema<People>({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    height: { type: String, required: true },
    mass: { type: String, required: true },
    hairColor: { type: String, required: true },
    skinColor: { type: String, required: true },
    eyeColor: { type: String, required: true },
    birthYear: { type: String, required: true },
    gender: { type: String, required: true },
    homeWorld: { type: mongoose.Schema.Types.String, ref: 'Planet' },
    url: { type: String, required: true }
}, { timestamps: true });

PeopleSchema.index({ url: 1 });
PeopleSchema.loadClass(People);

export default PeopleSchema;
