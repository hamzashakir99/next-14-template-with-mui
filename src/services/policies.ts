'use server';

import { ObjectId } from 'mongodb';
import { dbConnection } from './db.connection';

interface IPolicyValues {
  _id?: string;
  title: string;
  description: string;
  status: string;
  icon: string | null;
}
export interface IPolicy {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'active';
  icon: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export const addPolicies = async (values: IPolicyValues, dbName: string): Promise<boolean> => {
  try {
    const now = new Date();
    const { title, description, status, icon } = values;

    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');

    const lastPolicy = await collection.find().sort({ order: -1 }).limit(1).toArray();
    const order = lastPolicy.length ? lastPolicy[0].order + 1 : 0;

    const policyToAdd = {
      title,
      description,
      status,
      icon,
      order,
      createdAt: now,
      updatedAt: now
    };

    const result = await collection.insertOne(policyToAdd);
    console.log(`Policy added successfully: ${result.insertedId}`);
    await client.close();
    return true;
  } catch (error) {
    console.error('Failed to add Policy', error);
    return false;
  }
};

export const getAllPolicies = async (dbName: string): Promise<IPolicy[]> => {
  try {
    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');

    const policies = (await collection
      .find({ status: { $ne: 'delete' } })
      .project({
        _id: {
          $toString: '$_id'
        },
        title: 1,
        description: 1,
        status: 1,
        icon: 1,
        order: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .toArray()) as IPolicy[];
    await client.close();
    return policies;
  } catch (error) {
    console.error('Failed to get all Policies', error);
    return [];
  }
};

export const getPoliciesById = async (id: string, dbName: string): Promise<IPolicy | null> => {
  try {
    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');

    const policy = await collection.findOne({ _id: new ObjectId(id) });
    await client.close();

    if (policy) {
      const response = {
        _id: policy._id.toHexString(),
        title: policy.title,
        description: policy.description,
        status: policy.status,
        icon: policy.icon,
        order: policy.order,
        createdAt: policy.createdAt,
        updatedAt: policy.updatedAt
      };
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to get Policy by ID', error);
    return null;
  }
};

export const deletePoliciesById = async (id: string, dbName: string): Promise<boolean> => {
  try {
    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'delete' } });
    if (result.matchedCount === 1) {
      if (result.modifiedCount === 1) {
        await client.close();
        return true;
      } else {
        await client.close();
        return false;
      }
    } else {
      console.log(`Policy with ID ${id} not found.`);
      return false;
    }
  } catch (error) {
    console.error('Failed to delete Policy by ID', error);
    return false;
  }
};
export const updatePoliciesById = async (id: string, values: IPolicyValues, dbName: string): Promise<boolean> => {
  try {
    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');

    const { title, description, status, icon } = values;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          status,
          icon,
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount === 1) {
      console.log(`Policy with ID ${id} updated successfully`);
      await client.close();
      return true;
    } else {
      console.log(`Policy with ID ${id} not found`);
      await client.close();
      return false;
    }
  } catch (error) {
    console.error('Failed to update Policy by ID', error);
    return false;
  }
};

export const updatePolicyOrder = async (
  source: {
    _id: string;
    order: number;
  },
  destination: {
    _id: string;
    order: number;
  },
  dbName: string
): Promise<boolean> => {
  try {
    const { db, client } = await dbConnection(dbName);
    const collection = db.collection('policies');
    await Promise.all([
      collection.updateOne(
        {
          _id: new ObjectId(source._id)
        },
        {
          $set: {
            order: source.order
          }
        }
      ),
      collection.updateOne(
        {
          _id: new ObjectId(destination._id)
        },
        {
          $set: {
            order: destination.order
          }
        }
      )
    ]);
    await client.close();
    return true;
  } catch (error) {
    console.error('Failed to update Policy order', error);
    return false;
  }
};
