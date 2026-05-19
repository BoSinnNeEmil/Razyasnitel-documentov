import { Account, Client, Databases, ID, Query, Storage } from 'appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a0c5c28003c95a801a0')

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

export const APPWRITE_CONFIG = {
  databaseId: 'documents',
  collectionIds: {
    profiles: 'profiles',
    documents: 'documents',
    analyses: 'analyses',
    chatMessages: 'chat_messages',
  },
  bucketId: 'documents',
}

export async function createEmailSession(email: string, password: string) {
  return await account.createEmailSession(email, password)
}

export async function getCurrentUser() {
  try {
    return await account.get()
  } catch {
    return null
  }
}

export async function createUser(email: string, password: string, name?: string) {
  return await account.create(ID.unique(), email, password, name)
}

export async function deleteSession(sessionId: string) {
  return await account.deleteSession(sessionId)
}

export async function listSessions() {
  return await account.listSessions()
}

export async function uploadFile(file: File, userId: string) {
  const fileName = `${userId}/${Date.now()}-${file.name}`
  return await storage.createFile(APPWRITE_CONFIG.bucketId, ID.unique(), file)
}

export async function getFile(fileId: string) {
  return await storage.getFile(APPWRITE_CONFIG.bucketId, fileId)
}

export async function deleteFile(fileId: string) {
  return await storage.deleteFile(APPWRITE_CONFIG.bucketId, fileId)
}

export async function getFileDownload(fileId: string) {
  return await storage.getFileDownload(APPWRITE_CONFIG.bucketId, fileId)
}

export async function createDocument(data: {
  user_id: string
  title: string
  original_filename: string
  file_path: string
  file_size: number
  file_type: string
  page_count: number | null
  status: string
}) {
  return await databases.createDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.documents,
    ID.unique(),
    data
  )
}

export async function getDocument(documentId: string) {
  return await databases.getDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.documents,
    documentId
  )
}

export async function listDocuments(userId: string, limit = 10, offset = 0) {
  return await databases.listDocuments(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.documents,
    [
      Query.equal('user_id', userId),
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('created_at'),
    ]
  )
}

export async function updateDocument(
  documentId: string,
  data: Partial<{
    title: string
    status: string
  }>
) {
  return await databases.updateDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.documents,
    documentId,
    data
  )
}

export async function deleteDocument(documentId: string) {
  return await databases.deleteDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.documents,
    documentId
  )
}

export async function createAnalysis(data: {
  document_id: string
  summary: string
  key_points: unknown
  risks: unknown
  obligations: unknown
  checklist: unknown
  style: string
}) {
  return await databases.createDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.analyses,
    ID.unique(),
    data
  )
}

export async function getAnalysis(documentId: string) {
  const result = await databases.listDocuments(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.analyses,
    [Query.equal('document_id', documentId)]
  )
  return result.documents[0] || null
}

export async function createChatMessage(data: {
  document_id: string
  user_id: string
  role: string
  content: string
}) {
  return await databases.createDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.chatMessages,
    ID.unique(),
    data
  )
}

export async function listChatMessages(documentId: string, limit = 50) {
  return await databases.listDocuments(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.chatMessages,
    [Query.equal('document_id', documentId), Query.limit(limit), Query.orderAsc('created_at')]
  )
}

export async function getOrCreateProfile(userId: string, email: string) {
  try {
    return await databases.getDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collectionIds.profiles,
      userId
    )
  } catch {
    return await databases.createDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collectionIds.profiles,
      userId,
      {
        email,
        documents_count: 0,
        documents_limit: 5,
        subscription_tier: 'free',
        subscription_status: 'active',
      }
    )
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<{
    documents_count: number
    documents_limit: number
    subscription_tier: string
    subscription_status: string
  }>
) {
  return await databases.updateDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.collectionIds.profiles,
    userId,
    data
  )
}

export { client, ID, Query }
