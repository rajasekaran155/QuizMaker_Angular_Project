import { ApiQuestionTemplate } from "./api-question-template";

export interface WrapperTemplate{
    response_code: number,
    results: ApiQuestionTemplate[]
}