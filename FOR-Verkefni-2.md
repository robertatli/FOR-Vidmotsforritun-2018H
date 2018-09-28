# Verkefni 2

1. **Útskýrðu stuttlega eftirfarandi hugtök og hlutverk:**
   * GPU: líka þekkt sem Graphics Processing Unit og er Sérhannað til að reikna út graphíska útreikninga sem fær sent upplýsingar frá CPU-inu um hvað það á að reykna út, það er notað til að minnka útreikningana sem cpu-ið þarf að gera.
   * Pixels: Pixill er minnsta eining í stafrænni mynd, og er alltaf einlit, pixlar eru notaðir til að búa til stærri mynd á tölvuskjá.
   * Frame buffer: Frame buffer er partur af mynninu sem geymir upplýsingar um næsta frame sem á að senda til tölvuskjásins.
   * Raster-scan: Raster-scan er tegund af skjávörpun sem sendir inn línu fyrir línu í staðinn fyrir full unnar myndir, oft notað í eldri sjónvörpum. 
   * Refresh rate: Refresh rate er hversu oft skjárinn endurnýjar myndina sem er á honum.
   * WebGL: WebGL er JavaScript forritunarviðmót til að útfæra gagnvirkar tvívíðar og þrívíðar myndir í vafra. 
   * OpenGL: OpenGL er opið API notað til að úfæra gagnvirkar tvívíðar og þrívíðar myndir með því að nýta sér fullt afl GPUins.
2. **Afhverju eru 3D objectar búnir til útfrá samsettum þríhyrningum í 3D grafík?**
   * Því það er auðveldasta leiðin til að fá mismunandi form með því að nota sem minnst GPP (Graphics Processing Power).
3. **Útskýrðu ítarlega og tæknilega (án kóða) hvernig rendering pipeline virkar í WebGL.
Notaðu skýringamynd þér til stuðnings**
   1. First tekur **Vertex Shaderinn** inn staðsetninguna á verticenum og breytir henni þannig að formið er staðsett á þeim stað sem þú hefur valið í kóðanum (t.d. með rotation, translation eða scaling).
   2. Svo mun **Shape assembly** ákveða hvernig eigi að lesa listann af verticesum. Vanalega eru þeir lesnir sem raðir af þríhyrningum.
   3. Svo kemur að **rasterization**: Vegna þess að skjárinn þinn er 2d og kóðinn þinn er að senda inn 3d staðsetningar þá þarf að varpa myndinni af 3d heiminum í tölvunni á 2d skjáinn þinn. Það breytir þá formunum í **fragments** sem eru svo sent í **Fragment Shaderinn*
   4. Í **Fragment Shaderinum** mun hann taka inn öll fragmentin sem komu eftir rasterizationið og mun hann setja lit eða texture á fragmentin.
   5. Svo áður en þetta er sent á skjáinn þinn þá þarf að losna við öll auka fragment sem gætu verið eftir og skilur svo eftir pixla sem þú getur séð á skjánum þínum.
![GraphicsPipeline](/FOR-Verkefni-2/renderpipeline.jpg)
4. **Útskýrðu hlutverk og hvernig 2D/3D transformation fylkin (translation, rotation,
scale) í línulegri algebru og WebGL eru notuð.**
   * Translation: tranlation er mjög einfalt, það tekur inn x og y value og breytir staðsetningunni á myndinni eftir pixlum.
   ```javascript
    function updatePosition(index) {
      return function(event, ui) {
        translation[index] = ui.value;
        drawScene();
      }
    }
   ```
   * Rotation: rotation tekur inn angleið sem það er gefið, mínusar það með 360, breytir því í radiana og setur radianana inn i sin og cos.
    ```javascript
      function updateAngle(event, ui) {
        var angleInDegrees = 360 - ui.value;
        var angleInRadians = angleInDegrees * Math.PI / 180;
        rotation[0] = Math.sin(angleInRadians);
        rotation[1] = Math.cos(angleInRadians);
        drawScene();
      }
    ```
   * Scale: Scale tekur inn scaleX og scaleY og breytir scaleinu eftir x og y ásinum.
    ```javascript
      function updateScale(index) {
      return function(event, ui) {
        scale[index] = ui.value;
        drawScene();
      }
    }
    ```
5. **Hvað er WebGL Shaders og Graphics Library Shader Language (GLSL) og hvert er
þeirra hlutverk.**
   * GLSL: GLSL stendur fyrir Graphics Library Shader Languaga og Það er tungumálið sem shaderar eru skrifaðir í. Það hefur nokkra einstaka eiginleika sem eru ekki oft notaðir í javascript.
   * Vertex Shader: Tekur inn staðsetningar og stillir vertices eftir þeim, tekur einnig inn translation, rotation og scale.
   * Fragment Shader: Tekur inn fragments úr rasterizerinum og litar þau eða setur textures á fragmentin.
