const bot = require("../setup/setup").bot
let BigData = {};
bot.on("message", async (msg) => {

    let username = msg.from.username;
    if (BigData[username] == undefined) {
        BigData[username] = {
            BetId: -3,
            BetlarSoni: {
                value: null
            },
            QogozTuri: {
                text: null,
                value: null
            },
            MuqovaTuri: {
                text: null,
                value: null
            }
        }
        await bot.sendMessage(msg.from.id, `Hayrli Kun`, {
            reply_markup: {
                keyboard: [["Betlar Soni"], ["Qog'oz Turi"], ["Muqova Turi",], ["Kiritilgan Ma'lumot"], ["Hisobla"]],
            },
        });
    }

    switch (msg.text) {
        case "/start":
            await bot.sendMessage(msg.from.id, `Salom ` + `${msg.from.first_name}` + `${msg.from.last_name ?? ""}`, {
                reply_markup: {
                    keyboard: [["Betlar Soni"], ["Qog'oz Turi"], ["Muqova Turi",], ["Kiritilgan Ma'lumot"], ["Hisobla"]],
                },
            });
            BigData[username] = {
                BetId: -3,
                BetlarSoni: {
                    value: null
                },
                QogozTuri: {
                    text: null,
                    value: null
                },
                MuqovaTuri: {
                    text: null,
                    value: null
                }
            }
            break;
        case "/narx":
            await bot.sendMessage(msg.from.id,
                "---  Har bir bet narxi  ---\n\n" +
                "A5 - oq qora : 90 so'm\n" +
                "A4 - oq qora : 160 so'm\n" +
                "A5 - rangli : 130 so'm\n" +
                "A4 - rangli : 200 so'm\n" +
                "Pechat : 70 so'm\n\n" +
                "---  Muqova narxi  ---\n\n" +
                "Oddiy Pereplyot : 5.000 so'm\n" +
                "Temir pereplyot : 10.000 so'm\n" +
                "Termokley : 10.000 so'm\n" +
                "Qattiq muqova : 30.000 so'm\n\n" +
                "A4 format - katta qog'oz\n" +
                "A5 format - kitobcha"
            );

            break;
        case "Betlar Soni":
            await bot.sendMessage(msg.from.id, "Betlar Sonini kiriting:");
            BigData[username].BetId = msg.message_id;
            break;
        case "Qog'oz Turi":
            await bot.sendMessage(msg.from.id, "Qog'oz Turini Tanlang:", {
                reply_markup: {
                    inline_keyboard:
                        [
                            [{ text: "A5 oq-qora : 90 so'm", callback_data: "q1" }],
                            [{ text: "A4 oq-qora : 160 so'm", callback_data: 'q2' }],
                            [{ text: "A5 rangli : 130 so'm", callback_data: 'q3' }],
                            [{ text: "A4 rangli : 200 so'm", callback_data: 'q4' }],
                            [{ text: "Pechat : 70 so'm", callback_data: 'q5' }]

                        ]
                },
            });
            break;
        case "Muqova Turi":
            await bot.sendMessage(msg.from.id, "Muqova Turini Tanlang:", {
                reply_markup: {
                    inline_keyboard:
                        [
                            [{ text: "Oddiy Pereplyot : 5.000 so'm  ", callback_data: "m1" }],
                            [{ text: "Temir pereplyot : 10.000 so'm  ", callback_data: 'm2' }],
                            [{ text: "Termokley : 10.000 so'm  ", callback_data: 'm3' }],
                            [{ text: "Qattiq muqova : 30.000 so'm  ", callback_data: 'm4' }]

                        ]
                },
            });

            break;
        case "Kiritilgan Ma'lumot":
            await bot.sendMessage(msg.from.id,
                `Betlar Soni : ${BigData[username].BetlarSoni.value ?? ""}\nQog'oz Turi : ${BigData[`${username}`].QogozTuri.text ?? ""}\nMuqova Turi : ${BigData[`${username}`].MuqovaTuri.text ?? ""}`,
            );
            break;
        case "Hisobla":
            if ((BigData[`${username}`].BetlarSoni.value != null) && (BigData[`${username}`].QogozTuri.value != null) && (BigData[`${username}`].MuqovaTuri.value != null)) {
                await bot.sendMessage(msg.from.id,
                    `Betlar Soni : ${BigData[username].BetlarSoni.value ?? ""}\n` +
                    `Qog'oz Turi : ${BigData[username].QogozTuri.text ?? ""}\n` +
                    `Muqova Turi : ${BigData[`${username}`].MuqovaTuri.text ?? ""}\n\n` +
                    `NARX: ` +
                    `${BigData[`${username}`].BetlarSoni.value} x ${BigData[`${username}`].QogozTuri.value} + ${BigData[`${username}`].MuqovaTuri.value} = ${BigData[`${username}`].BetlarSoni.value * BigData[`${username}`].QogozTuri.value + BigData[`${username}`].MuqovaTuri.value} so'm`,
                );
            } else {
                await bot.sendMessage(msg.from.id, "Iltimos Ma'lumotlarni To'ldiring...");
            }

            break;

        default:
            if (msg.chat.id = BigData[username].BetId + 2) {
                if (/^(\-|\+)?([0-9]+|Infinity)$/.test(msg.text)) {
                    BigData[username].BetlarSoni.value = parseInt(msg.text);
                    await bot.sendMessage(msg.from.id, "Betlar Soni qabul qilindi !!!");
                } else {
                    BigData[username].BetId = msg.message_id;
                    await bot.sendMessage(msg.from.id, "Faqat Son Kiritish Kerak...");

                }
            }
            break;
    }





})





bot.on("callback_query", async (query) => {
    let username = query.from.username.toString();
    if (!BigData[username]) {
        BigData[username] = {
            BetId: -3,
            BetlarSoni: {
                value: null
            },
            QogozTuri: {
                text: null,
                value: null
            },
            MuqovaTuri: {
                text: null,
                value: null
            }
        }
        await bot.sendMessage(query.from.id, `Hayrli Kun ` + `${query.from.first_name}` + `${query.from.last_name ?? ""}`, {
            reply_markup: {
                keyboard: [["Betlar Soni"], ["Qog'oz Turi"], ["Muqova Turi",], ["Kiritilgan Ma'lumot"], ["Hisobla"]],
            },
        });
    }

    switch (query.data) {
        case "q1":
            BigData[username].QogozTuri.text = "A5 oq-qora [90 so'm]";
            BigData[username].QogozTuri.value = 90;
            break;
        case "q2":
            BigData[`${username}`].QogozTuri.text = "A4 oq-qora [160 so'm]";
            BigData[`${username}`].QogozTuri.value = 160;
            break;
        case "q3":
            BigData[`${username}`].QogozTuri.text = "A5 rangli [130 so'm]";
            BigData[`${username}`].QogozTuri.value = 130;
            break;
        case "q4":
            BigData[`${username}`].QogozTuri.text = "A4 rangli [200 so'm]";
            BigData[`${username}`].QogozTuri.value = 200;
            break;
        case "q5":
            BigData[`${username}`].QogozTuri.text = "Pechat [70 so'm]";
            BigData[`${username}`].QogozTuri.value = 70;
            break;

    }
    switch (query.data) {

        case "m1":
            BigData[username].MuqovaTuri.text = "Oddiy Pereplyot [5.000 so'm]";
            BigData[username].MuqovaTuri.value = 5000;
            break;
        case "m2":
            BigData[`${username}`].MuqovaTuri.text = "Temir pereplyot [10.000 so'm]  ";
            BigData[`${username}`].MuqovaTuri.value = 5000;
            break;
        case "m3":
            BigData[`${username}`].MuqovaTuri.text = "Termokley [10.000 so'm]";
            BigData[`${username}`].MuqovaTuri.value = 5000;
            break;
        case "m4":
            BigData[`${username}`].MuqovaTuri.text = "Qattiq muqova [30.000 so'm]";
            BigData[`${username}`].MuqovaTuri.value = 5000;
            break;

    }
    if (query.data[0] == "q") {
        await bot.sendMessage(query.from.id, "Qog'oz Turi qabul qilindi !!!");
    } else {
        await bot.sendMessage(query.from.id, "Muqova Turi qabul qilindi !!!");

    }

});
