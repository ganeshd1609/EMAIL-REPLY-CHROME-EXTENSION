package com.email.MailWriter.Service;


import com.email.MailWriter.EmailRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailGeneratorService
{
private final WebClient webClient;
private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,

                                 @Value("${openai.api.url}") String baseUrl,
                                 @Value("${openai.api.key}") String openAiApiKey ) {
        this.webClient = webClientBuilder.baseUrl(baseUrl)
                .build();
        this.apiKey = openAiApiKey;
    }

    public String generateEmailReplay(EmailRequest emailRequest) {
        //Build prompt

        String prompt= buildPrompt(emailRequest);

        //prepare raw json body

         String requestBody = String.format("""
                 {
                     "model": "gpt-4o-mini",
                     "messages": [
                       {
                         "role": "user",
                         "content": "%s"
                       }
                     ]
                   }""",prompt);

        System.out.println(requestBody);
        //Send Request

        String response = webClient.post()
                .uri("/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();




        //Extract response

        return extractResponseContent(response);


    }

    private String extractResponseContent(String response) {


        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
           return root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email for the following email:");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("use a")
                    .append(emailRequest.getTone())
                    .append("tone.");
        }
        prompt.append("Orignal Email: ").append(emailRequest.getEmailContent());
        return prompt.toString();

    }
}
