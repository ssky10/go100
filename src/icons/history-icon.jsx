import React from "react";

const HistoryIcon = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <g fill={color}>
        <path d="M24.13714504 62.27892633c-1.2862061-.21418396-1.64735863-.5986825-1.35778927-1.4455595.28751834-.84088596 3.03210833-1.95405088 4.06649045-1.6493078.54315078.16001693.72235082.5486593.72235082 1.56659046 0 1.7292685-.6052147 1.99884742-3.431052 1.52827684zM24.3095554 54.87411904c-.67967997-.68075934-.93335289-1.33277373-.9293195-2.38862925.00646944-1.69331166.86438112-4.17099609 1.92129382-5.54877867.79593925-1.03758516.95367615-1.93290002.3968126-2.2523606-.18971812-.10884011-.25238819-.83839826-.13927022-1.62124584.15407711-1.06629825.03416566-1.59927044-.47800272-2.12459548-.96093474-.98562982-.24747797-2.46771942 1.1879255-2.46771942.88964892 0 .98188703-.11127827.80664033-.97314525-.38481154-1.89250918-1.33801878-3.77047427-2.03847186-4.0161032-.39017161-.1368207-1.43850286-.16326193-2.32962331-.05875675-1.07537938.12611609-1.620219.05483939-1.620219-.21196165 0-.2210809-.2236741-.40196915-.4970565-.40196915-.7590707 0-2.9341823-2.24348198-2.93256971-3.0247513.00078152-.37999021.34388672-1.21228065.762456-1.849528.41856547-.63724737.7610302-1.32047672.7610302-1.51828 0-.1978068.33501555-.791114.7444773-1.31846318.40945793-.52734918.85287946-1.38171763.98537525-1.8985993.19254302-.75113721.0813655-.9867799-.55386328-1.17392459-.43711984-.12878073-.79476126-.38401019-.79476126-.56717028 0-.18316363-.3203802-.14730234-.71195473.07969529-.90708247.52582753-2.01937997.1567967-1.71881219-.57026312.12373518-.29931117.02493994-.54420052-.21954158-.54420052-.24448151 0-.33848853-.15924195-.2089015-.353871.12958702-.19462905-.07635235-.353871-.45764134-.353871-.38128519 0-.91035722-.3226985-1.17571097-.71710542-.42262936-.62817765-.35126729-.82427172.5754446-1.58123718.58184924-.47527352 1.40263313-.8691638 1.82396631-.87531407.42133319-.00615028.98033543-.32966623 1.24222381-.71892433.2618884-.3892581.73886943-.707742 1.05995871-.707742.91789028 0 3.48532743-1.3275612 3.73487928-1.9312156.14441298-.34933083.71041075-.5458814 1.57193266-.5458814 1.07123543 0 1.34626094-.13815831 1.34626094-.6762864 0-.65009996 1.98768848-2.50855154 2.68299498-2.50855154.18542167 0 .6733249-.33497075 1.0842353-.74437826l.74710395-.74437826.6278139 1.1269305c.41958335.75316135.8192666 1.0587325 1.2050617.92131377.3174905-.1130901 1.25481578-.20561675 2.08294974-.20561675 1.09100973 0 1.56992359-.1705552 1.73889146-.61927425.36223141-.9619523 2.87647963-3.27330675 3.56064284-3.27330675.33726097 0 .9814791-.3184839 1.43160263-.707742.45011971-.3892581 1.00080356-.707742 1.22374188-.707742.22293451 0 .61377327-.42463812.86852888-.94363594.680004-1.38535189 2.26522628-2.94894506 2.98973103-2.94894506.9047341 0 1.54252092.85289281 1.92335245 2.57203352.86249785 3.89349398.90927071 3.58443367-.77696554 5.13410201-1.22679552 1.127433-1.5658292 1.70130915-1.5658292 2.65044319 0 2.81700071-6.51131706 9.81406722-9.13275897 9.81406722-.74340222 0-1.27402204.24360126-1.54162503.707742-.22442893.3892581-.71652947.707742-1.09356015.707742-.37702686 0-.78892084.09599459-.91531699.21332052-.41560714.38578309.47394646 1.96767492 2.0281444 3.60662846.88228358.93040117 1.70240032 2.2538964 1.94046958 3.13151064.22678873.83602378.65061133 1.7035987.94182759 1.92794583.29122007.2243436.52948757.61219683.52948757.86189528 0 .24969846.62530922 1.14584138 1.38957224 1.99143029 2.01217476 2.22628385 2.5424286 3.61993047 2.60456876 6.84549648.02999502 1.5570324.35636812 3.8334704.72527483 5.05875227.39840995 1.32326168.56948602 2.65572754.42134844 3.28178196-.2943347 1.24393441-1.92955502 3.16027327-2.69666963 3.16027327-.29587486 0-.53795464.14659106-.53795464.32575241 0 .1791649-.51363611.43047346-1.14141188.55846152-.62777959.12798807-1.30447073.49893688-1.50376529.82432834-.30994599.5060603-.48000036.52470577-1.17590539.12891875-.71842416-.40859362-.83701657-.37944526-1.01414272.24928088-.19199405.68149893-.24375719.6865062-1.20903792.11700391-.55464862-.32723867-1.10716617-.72230733-1.22780958-.87793272-.12064723-.15562185-.65391658.07956436-1.18504724.52263562-2.02846844 1.6921545-4.16906366 2.21407176-5.19084238 1.2656161-.35581153-.33027843-.55913567-.33027843-.9149472 0-.6646024.61691038-.9945781.53408688-2.03871204-.51170455z" />
      </g>
    </svg>
  );
};

export default HistoryIcon;