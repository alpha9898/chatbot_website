# Health and Fitness Chatbot | روبوت الصحة واللياقة البدنية

[English](#english) | [العربية](#arabic)

---

## English

### 🏃‍♂️ Health and Fitness Chatbot

A modern, responsive web-based chatbot that provides comprehensive information about exercises, nutrition, and general fitness advice using advanced AI technology.

### ✨ Features

- **🤖 AI-Powered Responses**: Uses Meta Llama 3.3 70B model for intelligent health and fitness guidance
- **💪 Exercise Database**: Access to detailed exercise information with instructions and difficulty levels
- **🥗 Nutrition Facts**: Get nutritional information for various foods including calories and macronutrients
- **📱 Responsive Design**: Modern glassmorphism UI that works perfectly on all devices
- **🌙 Dark/Light Mode**: Toggle between themes for comfortable viewing
- **💬 Chat History**: Save and manage multiple conversation sessions
- **📝 Markdown Support**: Rich text formatting for better readability
- **⚡ Real-time Responses**: Fast and efficient API integrations

### 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Model**: Meta Llama 3.3 70B Instruct Turbo
- **APIs**: Together AI, API Ninjas (Exercise & Nutrition)
- **Deployment**: GitHub Pages with automated CI/CD
- **Styling**: Glassmorphism design with CSS variables

### 🚀 Quick Setup

#### For GitHub Pages Deployment:

1. Fork this repository
2. Go to your repository's **Settings**
3. Scroll to **"GitHub Pages"** section
4. Under **"Source"**, select **"main"** branch
5. Click **"Save"**

Your site will be available at: `https://[your-username].github.io/[repository-name]`

#### For Local Development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-username]/[repository-name].git
   cd [repository-name]
   ```

2. **Update API Configuration:**
   - Open `config.js`
   - Add your Together AI API key
   - Add your API Ninjas key

3. **Run locally:**
   ```bash
   # Option 1: Use the included server
   node server.js
   
   # Option 2: Open index.html in your browser directly
   ```

### 🔧 Configuration

Update the `config.js` file with your API credentials:

```javascript
const config = {
    CHAT_API_KEY: 'your-together-ai-key',
    CHAT_MODEL: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    API_KEY: 'your-api-ninjas-key'
};
```

### 📖 Usage

1. **General Questions**: Ask about health, fitness, or medical topics
2. **Exercise Queries**: Use keywords like "exercise", "workout", "training"
3. **Nutrition Questions**: Use keywords like "food", "nutrition", "diet", "calories"

**Example Queries:**
- "What are good chest exercises?"
- "Nutrition facts for chicken breast"
- "How to lose weight safely?"

### ⚠️ Important Security Notes

- **Never commit** your `config.js` file with real API keys
- Add `config.js` to your `.gitignore` file
- Keep your API keys secure and private
- Regularly rotate your API keys

### 📄 Disclaimer

This chatbot provides general information only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult healthcare professionals for medical concerns.

---

## Arabic

### 🏃‍♂️ روبوت الصحة واللياقة البدنية

روبوت محادثة حديث ومتجاوب يعمل عبر الويب ويوفر معلومات شاملة حول التمارين والتغذية ونصائح اللياقة البدنية باستخدام تقنيات الذكاء الاصطناعي المتقدمة.

### ✨ المميزات

- **🤖 ردود مدعومة بالذكاء الاصطناعي**: يستخدم نموذج Meta Llama 3.3 70B للإرشاد الذكي في الصحة واللياقة
- **💪 قاعدة بيانات التمارين**: الوصول إلى معلومات مفصلة عن التمارين مع التعليمات ومستويات الصعوبة
- **🥗 حقائق التغذية**: احصل على معلومات غذائية لأطعمة متنوعة تشمل السعرات والعناصر الغذائية الكبرى
- **📱 تصميم متجاوب**: واجهة عصرية بتأثير الزجاج تعمل بشكل مثالي على جميع الأجهزة
- **🌙 الوضع المظلم/الفاتح**: التبديل بين الأوضاع لمشاهدة مريحة
- **💬 سجل المحادثات**: حفظ وإدارة جلسات محادثة متعددة
- **📝 دعم التنسيق**: تنسيق نص غني لقابلية قراءة أفضل
- **⚡ ردود فورية**: تكامل سريع وفعال مع واجهات برمجة التطبيقات

### 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية**: HTML5, CSS3, JavaScript خالص
- **نموذج الذكاء الاصطناعي**: Meta Llama 3.3 70B Instruct Turbo  
- **واجهات برمجة التطبيقات**: Together AI, API Ninjas (التمارين والتغذية)
- **النشر**: GitHub Pages مع CI/CD تلقائي
- **التصميم**: تصميم زجاجي مع متغيرات CSS

### 🚀 الإعداد السريع

#### للنشر على GitHub Pages:

1. انسخ هذا المستودع (Fork)
2. اذهب إلى **الإعدادات** في مستودعك
3. انزل إلى قسم **"GitHub Pages"**
4. تحت **"المصدر"**, اختر فرع **"main"**
5. اضغط **"حفظ"**

سيكون موقعك متاحاً على: `https://[اسم-المستخدم].github.io/[اسم-المستودع]`

#### للتطوير المحلي:

1. **استنساخ المستودع:**
   ```bash
   git clone https://github.com/[اسم-المستخدم]/[اسم-المستودع].git
   cd [اسم-المستودع]
   ```

2. **تحديث إعدادات API:**
   - افتح `config.js`
   - أضف مفتاح Together AI الخاص بك
   - أضف مفتاح API Ninjas الخاص بك

3. **التشغيل محلياً:**
   ```bash
   # الخيار الأول: استخدام الخادم المرفق
   node server.js
   
   # الخيار الثاني: فتح index.html في المتصفح مباشرة
   ```

### 🔧 الإعدادات

حدّث ملف `config.js` ببيانات اعتماد API الخاصة بك:

```javascript
const config = {
    CHAT_API_KEY: 'مفتاح-together-ai-الخاص-بك',
    CHAT_MODEL: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    API_KEY: 'مفتاح-api-ninjas-الخاص-بك'
};
```

### 📖 طريقة الاستخدام

1. **الأسئلة العامة**: اسأل عن الصحة أو اللياقة أو المواضيع الطبية
2. **استفسارات التمارين**: استخدم كلمات مثل "تمرين"، "رياضة"، "تدريب"
3. **أسئلة التغذية**: استخدم كلمات مثل "طعام"، "تغذية"، "حمية"، "سعرات"

**أمثلة على الاستفسارات:**
- "ما هي أفضل تمارين الصدر؟"
- "معلومات غذائية عن صدر الدجاج"
- "كيف أنقص الوزن بأمان؟"

### ⚠️ ملاحظات أمنية مهمة

- **لا تقم أبداً** بحفظ ملف `config.js` مع مفاتيح API حقيقية في نظام التحكم بالإصدارات
- أضف `config.js` إلى ملف `.gitignore` الخاص بك
- احتفظ بمفاتيح API آمنة وخاصة
- قم بتدوير مفاتيح API بانتظام

### 📄 إخلاء المسؤولية

يوفر هذا الروبوت معلومات عامة فقط ولا يجب استخدامه كبديل للمشورة الطبية المهنية أو التشخيص أو العلاج. استشر دائماً المختصين في الرعاية الصحية للمخاوف الطبية.

---

## 📞 Support | الدعم

For support or questions, please open an issue in this repository.  
للدعم أو الأسئلة، يرجى فتح مشكلة في هذا المستودع.

## 📄 License | الترخيص

This project is open source and available under the MIT License.  
هذا المشروع مفتوح المصدر ومتاح تحت ترخيص MIT. 