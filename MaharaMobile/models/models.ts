export interface MaharaStore {
  app: InitialState;
}

export interface InitialState {
  token: string;
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  uploadList: {
    files: Array<MaharaPendingFile>,
    journalEntries: Array<PendingJournalEntry>
  }
  userBlogs: Array<any>;
}

export interface MaharaFile {
  uri: string;
  type: string; // mimetype
  name: string;
  size: number;
}

export interface MaharaPendingFile {
  maharaFormData: MaharaFileFormData;
  id: string;
  url: string; // for files, this url includes tags
}

export interface JournalEntry {
  blogid: number;
  wsfunction: string;
  wstoken: string; // aka: ws function
  title: string;
  body: string;
  isdraft: boolean;
  tags?: Array<string>;
}

export interface PendingJournalEntry {
  journalEntry: JournalEntry,
  id: string;
  url: string;
}

export interface User {
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
}

export interface UserFolder {
  title: string;
}

export interface UserTag {
  tag: string;
  usage: number;
}

export interface UserBlog {
  description: string;
  id: number;
  locked: boolean;
  numBlogPosts: number;
  title: string;
}

export interface MaharaFileFormData {
  webservice: string;
  wstoken: string;
  foldername: string;
  title: string;
  description: string;
  filetoupload: {
    uri: string,
    type: string,
    name: string,
  };
}