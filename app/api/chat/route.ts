import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API key not found" }, { status: 500 })
    }

    const systemPrompt = "أنت مساعد ذكي لموقع 'دليل أسعار الذهب العربي'. وظيفتك مساعدة المستخدمين في معرفة أسعار الذهب، الاستثمار، وحساب الزكاة. تحدث بالعربية الفصحى بأسلوب ودود ومهني."

    const requestBody = JSON.stringify({
      model: "google/gemma-4-26b-a4b-it",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      max_tokens: 512,
      temperature: 0.7,
    })

    const encoder = new TextEncoder()
    const encodedBody = encoder.encode(requestBody)

    let retries = 3
    let delay = 1000
    let result: any
    let response: Response

    while (retries > 0) {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": encodedBody.length.toString(),
          "HTTP-Referer": "https://gold-price-arab.vercel.app/",
          "X-Title": "Arab Gold Guide",
        },
        method: "POST",
        body: encodedBody,
      })

      result = await response.json()

      if (response.status === 429 || (result.error?.code === 429)) {
        console.log(`Rate limited, retrying in ${delay}ms... (${retries} retries left)`)
        await new Promise(r => setTimeout(r, delay))
        delay *= 2
        retries--
        continue
      }

      break
    }

    if (result.error) {
      console.error("OpenRouter Error:", result.error)
      return NextResponse.json({ error: result.error.message || "Failed to get response" }, { status: 500 })
    }

    const answer = result.choices?.[0]?.message?.content || "عذراً، واجهت مشكلة في معالجة طلبك."

    return NextResponse.json({
      message: {
        role: "assistant",
        content: answer
      }
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
