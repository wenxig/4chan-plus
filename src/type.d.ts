type Thread = {
  title: string;
  main: string;
  cover_perview: string;
  cover: string | undefined;
  isSticky: boolean;
  isClosed: boolean;
  date: Date;
  id: string;
  from: string;
  reply: Thread[]
}