import * as Mongoose from "mongoose";

interface Document extends Mongoose.Document {
  userId: string;
  startTime: number;
  status: string;
}

const Schema = new Mongoose.Schema({
  userId: { type: String, required: true },
  startTime: { type: Number, required: true },
  status: { type: String, required: true },
});

const Model = Mongoose.model<Document>("user-status", Schema);

export interface Status {
  startTime: number;
  status: string;
}

export interface UsersStatuses {
  [id: string]: Status[];
}

export interface UsersStatus {
  [id: string]: Status;
}

export async function getAllUserStatuses(): Promise<UsersStatuses> {
  const documents = await Model.find();

  // Group Status by userId
  const usersStatuses: UsersStatuses = {};
  for (const document of documents) {
    const status: Status = {
      startTime: document.startTime,
      status: document.status,
    };

    if (document.userId in usersStatuses) {
      usersStatuses[document.userId].push(status);
    } else {
      usersStatuses[document.userId] = [status];
    }
  }

  // Sort statuses by startTime
  for (const id in usersStatuses) {
    usersStatuses[id].sort((a, b) => a.startTime - b.startTime);
  }

  return usersStatuses;
}

export async function getUserStatuses(userId: string): Promise<Status[]> {
  const documents = await Model.find({ userId: userId });

  const userStatuses: Status[] = [];
  for (const document of documents) {
    userStatuses.push({
      startTime: document.startTime,
      status: document.status,
    });
  }

  // Sort statuses by startTime
  userStatuses.sort((a, b) => a.startTime - b.startTime);

  return userStatuses;
}

export async function getAllUserLatestStatus(): Promise<UsersStatus> {
  const usersStatuses = await getAllUserStatuses();

  const usersStatus: UsersStatus = {};
  for (const id in usersStatuses) {
    const statuses = usersStatuses[id];
    if (statuses.length > 0) {
      usersStatus[id] = statuses[statuses.length - 1];
    }
  }

  return usersStatus;
}

export async function getUserLatestStatus(
  userId: string
): Promise<Status | undefined> {
  const userStatuses = await getUserStatuses(userId);

  if (userStatuses.length > 0) {
    return userStatuses[userStatuses.length - 1];
  }

  return undefined;
}

export async function updateUserStatus(
  userId: string,
  status: Status
): Promise<void> {
  await Model.create({
    userId: userId,
    startTime: status.startTime,
    status: status.status,
  });
}
