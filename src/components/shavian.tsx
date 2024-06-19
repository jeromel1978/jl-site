"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

const ShavianCodePrefix = 55297;
const ShavianCodeStart = 56400;
const ShavianCodeEnd = 56447;
const Capital = 183;

type MapItem = {
  Char: string;
  En: RegExp[];
  Code: number;
  SCode: number;
  Shav: string;
};

const ShavMap: MapItem[] = [
  { Char: "peep", En: [/p/g], Code: 112, SCode: 56400, Shav: "𐑐" },
  { Char: "tot", En: [/t/g], Code: 116, SCode: 56401, Shav: "𐑑" },
  { Char: "kick", En: [/k/g], Code: 107, SCode: 56402, Shav: "𐑒" },
  { Char: "fee", En: [/f/g], Code: 102, SCode: 56403, Shav: "𐑓" },
  { Char: "thigh", En: [/th/g], Code: 0, SCode: 56404, Shav: "𐑔" },
  { Char: "so", En: [/s/g], Code: 115, SCode: 56405, Shav: "𐑕" },
  { Char: "sure", En: [/sh/g], Code: 0, SCode: 56406, Shav: "𐑖" },
  { Char: "church", En: [/ch/g], Code: 0, SCode: 56407, Shav: "𐑗" },
  { Char: "yea", En: [/y/g], Code: 121, SCode: 56408, Shav: "𐑘" },
  { Char: "hung", En: [/ng/g], Code: 0, SCode: 56409, Shav: "𐑙" },
  { Char: "bib", En: [/b/g], Code: 98, SCode: 56410, Shav: "𐑚" },
  { Char: "dead", En: [/d/g], Code: 100, SCode: 56411, Shav: "𐑛" },
  { Char: "gag", En: [/g/g], Code: 103, SCode: 56412, Shav: "𐑜" },
  { Char: "vow", En: [/v/g], Code: 118, SCode: 56413, Shav: "𐑝" },
  { Char: "they", En: [/th/g], Code: 0, SCode: 56414, Shav: "𐑞" },
  { Char: "zoo", En: [/z/g], Code: 122, SCode: 56415, Shav: "𐑟" },
  { Char: "measure", En: [], Code: 0, SCode: 56416, Shav: "𐑠" },
  { Char: "judge", En: [/j/g], Code: 106, SCode: 56417, Shav: "𐑡" },
  { Char: "woe", En: [/w/g], Code: 119, SCode: 56418, Shav: "𐑢" },
  { Char: "ha-ha", En: [/h/g], Code: 104, SCode: 56419, Shav: "𐑣" },
  { Char: "loll", En: [/l/g], Code: 108, SCode: 56420, Shav: "𐑤" },
  { Char: "mime", En: [/m/g], Code: 109, SCode: 56421, Shav: "𐑥" },
  { Char: "if", En: [/i/g], Code: 105, SCode: 56422, Shav: "𐑦" },
  { Char: "egg", En: [/e/g], Code: 101, SCode: 56423, Shav: "𐑧" },
  { Char: "ash", En: [/a/g], Code: 97, SCode: 56424, Shav: "𐑨" },
  { Char: "ado", En: [], Code: 0, SCode: 56425, Shav: "𐑩" },
  { Char: "on", En: [/o/g], Code: 111, SCode: 56426, Shav: "𐑪" },
  { Char: "wool", En: [/oo/g], Code: 0, SCode: 56427, Shav: "𐑫" },
  { Char: "out", En: [/ou/, /ow/g], Code: 0, SCode: 56428, Shav: "𐑬" },
  { Char: "ah", En: [/ah/g], Code: 0, SCode: 56429, Shav: "𐑭" },
  { Char: "roar", En: [/r/g], Code: 114, SCode: 56430, Shav: "𐑮" },
  { Char: "nun", En: [/n/g], Code: 110, SCode: 56431, Shav: "𐑯" },
  { Char: "eat", En: [/ea/g, /ee/g, /E/g], Code: 0, SCode: 56432, Shav: "𐑰" },
  { Char: "age", En: [/ay/g, /[a]+[a-z]+[e]/g, /eigh/g, /A/g], Code: 0, SCode: 56433, Shav: "𐑱" },
  { Char: "ice", En: [/aye/g, /[i]+[a-z]+[e]/g, /I/g], Code: 0, SCode: 56434, Shav: "𐑲" },
  { Char: "up", En: [/u/g], Code: 117, SCode: 56435, Shav: "𐑳" },
  { Char: "oak", En: [], Code: 0, SCode: 56436, Shav: "𐑴" },
  { Char: "ooze", En: [/oo/g], Code: 0, SCode: 56437, Shav: "𐑵" },
  { Char: "oil", En: [/oi/g, /oy/g], Code: 0, SCode: 56438, Shav: "𐑶" },
  { Char: "awe", En: [/aw/g], Code: 0, SCode: 56439, Shav: "𐑷" },
  { Char: "are", En: [/ar/g], Code: 0, SCode: 56440, Shav: "𐑸" },
  { Char: "or", En: [], Code: 0, SCode: 56441, Shav: "𐑹" },
  { Char: "air", En: [], Code: 0, SCode: 56442, Shav: "𐑺" },
  { Char: "err", En: [], Code: 0, SCode: 56443, Shav: "𐑻" },
  { Char: "array", En: [/ar/g], Code: 0, SCode: 56444, Shav: "𐑼" },
  { Char: "ear", En: [], Code: 0, SCode: 56445, Shav: "𐑽" },
  { Char: "ian", En: [/ian/g], Code: 0, SCode: 56446, Shav: "𐑾" },
  { Char: "yew", En: [/U/g], Code: 0, SCode: 56447, Shav: "𐑿" },
  { Char: "dot", En: [/\.\*/g], Code: 0, SCode: 56447, Shav: "·" },
];
//·
const FillRange = (start: number, end: number) => {
  return [...Array(end - start + 1)].map((item, index) => start + index);
};
const ShavianCode = FillRange(ShavianCodeStart, ShavianCodeEnd);

export default function Shavian() {
  const [ShavText, setShavText] = useState<string>("");
  const [InputText, setInputText] = useState<string>("");
  //   function hex_to_ascii(str1: string) {
  //     var hex = str1.toString();
  //     var str = "";
  //     for (var n = 0; n < hex.length; n += 2) {
  //       str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  //     }
  //     return str;
  //   }
  //   const Translated = useMemo(() => hex_to_ascii(InputText), [InputText]);

  const Translated = useMemo(() => {
    let T = InputText;
    ShavMap.sort((a, b) => a.Code - b.Code).forEach((L) => {
      const Opt = L.En.filter((R) => InputText.match(R));
      Opt.forEach((O) => (T = T.replace(O, L.Shav)));
    });
    return T;
  }, [InputText]);

  const Code = useMemo(
    () =>
      ShavText.split("")
        .map((char) => char.charCodeAt(0))
        .join(","),
    [ShavText]
  );
  return (
    <>
      <div>
        <Input onChange={(e) => setShavText(e.target.value)} />
      </div>
      <div>{Code}</div>
      <div>
        <Input onChange={(e) => setInputText(e.target.value)} />
      </div>
      <div>{Translated}</div>
      <div>Shavian alphabet info | 𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑 𐑦𐑯𐑓𐑴</div>
      <div>&#00B7; &#10462; &#1045A; &#1046E; &#10474; &#10465;</div>
      <div className="grid grid-cols-10 gap-2">
        {ShavMap.map((Shav, Index) => (
          <Button key={Shav.Shav} title={Shav.Char}>{`${Shav.Shav}`}</Button>
        ))}
      </div>
    </>
  );
}
