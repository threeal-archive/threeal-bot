import * as Axios from "axios";

interface RasaResponse {
  recipent_id: string;
  text?: string;
  image?: string;
}

export interface Message {
  userId: string;
  text: string;
  file?: string;
}

export class Instance {
  private axios: Axios.AxiosInstance;

  constructor(nluUrl: string) {
    this.axios = Axios.default.create({
      baseURL: nluUrl,
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  async init(): Promise<string> {
    const res = await this.axios.get("/");
    return res.data as string;
  }

  async talk(message: Message): Promise<Message[]> {
    const res = await this.axios.post("/webhooks/rest/webhook", {
      message: message.text,
      sender: message.userId,
    });

    const rasaResponses = res.data as RasaResponse[];
    return rasaResponses.map((rasaResponse: RasaResponse) => {
      return {
        userId: rasaResponse.recipent_id,
        text: rasaResponse.text || "",
        file: rasaResponse.image,
      };
    });
  }
}
