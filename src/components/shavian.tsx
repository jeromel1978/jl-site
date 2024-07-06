"use client";
import { useState, useEffect, useMemo, MouseEventHandler } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type MapItem = {
  Char: string;
  En: RegExp[];
  Key: string;
  Code: number;
  SCode: number;
  Shav: string;
};

const ShavMap: MapItem[] = [
  { Char: "peep", En: [/p/g], Key: "p", Code: 112, SCode: 56400, Shav: "𐑐" },
  { Char: "tot", En: [/t/g], Key: "t", Code: 116, SCode: 56401, Shav: "𐑑" },
  { Char: "kick", En: [/k/g], Key: "k", Code: 107, SCode: 56402, Shav: "𐑒" },
  { Char: "fee", En: [/f/g], Key: "f", Code: 102, SCode: 56403, Shav: "𐑓" },
  { Char: "thigh", En: [/th/g], Key: "", Code: 0, SCode: 56404, Shav: "𐑔" },
  { Char: "so", En: [/s/g], Key: "s", Code: 115, SCode: 56405, Shav: "𐑕" },
  { Char: "sure", En: [/sh/g], Key: "", Code: 0, SCode: 56406, Shav: "𐑖" },
  { Char: "church", En: [/ch/g], Key: "j", Code: 0, SCode: 56407, Shav: "𐑗" },
  { Char: "yea", En: [/y/g], Key: "y", Code: 121, SCode: 56408, Shav: "𐑘" },
  { Char: "hung", En: [/ng/g], Key: "", Code: 0, SCode: 56409, Shav: "𐑙" },
  { Char: "bib", En: [/b/g], Key: "P", Code: 98, SCode: 56410, Shav: "𐑚" },
  { Char: "dead", En: [/d/g], Key: "T", Code: 100, SCode: 56411, Shav: "𐑛" },
  { Char: "gag", En: [/g/g], Key: "K", Code: 103, SCode: 56412, Shav: "𐑜" },
  { Char: "vow", En: [/v/g], Key: "F", Code: 118, SCode: 56413, Shav: "𐑝" },
  { Char: "they", En: [/th/g], Key: "", Code: 0, SCode: 56414, Shav: "𐑞" },
  { Char: "zoo", En: [/z/g], Key: "S", Code: 122, SCode: 56415, Shav: "𐑟" },
  { Char: "measure", En: [], Key: "", Code: 0, SCode: 56416, Shav: "𐑠" },
  { Char: "judge", En: [/j/g], Key: "J", Code: 106, SCode: 56417, Shav: "𐑡" },
  { Char: "woe", En: [/w/g], Key: "w", Code: 119, SCode: 56418, Shav: "𐑢" },
  { Char: "ha-ha", En: [/h/g], Key: "h", Code: 104, SCode: 56419, Shav: "𐑣" },
  { Char: "loll", En: [/l/g], Key: "l", Code: 108, SCode: 56420, Shav: "𐑤" },
  { Char: "mime", En: [/m/g], Key: "m", Code: 109, SCode: 56421, Shav: "𐑥" },
  { Char: "if", En: [/i/g], Key: "i", Code: 105, SCode: 56422, Shav: "𐑦" },
  { Char: "egg", En: [/e/g], Key: "e", Code: 101, SCode: 56423, Shav: "𐑧" },
  { Char: "ash", En: [/a/g], Key: "a", Code: 97, SCode: 56424, Shav: "𐑨" },
  { Char: "ado", En: [], Key: "u", Code: 0, SCode: 56425, Shav: "𐑩" },
  { Char: "on", En: [/o/g], Key: "o", Code: 111, SCode: 56426, Shav: "𐑪" },
  { Char: "wool", En: [/oo/g], Key: "q", Code: 0, SCode: 56427, Shav: "𐑫" },
  { Char: "out", En: [/ou/, /ow/g], Key: "d", Code: 0, SCode: 56428, Shav: "𐑬" },
  { Char: "ah", En: [/ah/g], Key: "g", Code: 0, SCode: 56429, Shav: "𐑭" },
  { Char: "roar", En: [/r/g], Key: "L", Code: 114, SCode: 56430, Shav: "𐑮" },
  { Char: "nun", En: [/n/g], Key: "M", Code: 110, SCode: 56431, Shav: "𐑯" },
  { Char: "eat", En: [/ea/g, /ee/g, /E/g], Key: "I", Code: 0, SCode: 56432, Shav: "𐑰" },
  { Char: "age", En: [/ay/g, /[a]+[a-z]+[e]/g, /eigh/g, /E/g], Key: "A", Code: 0, SCode: 56433, Shav: "𐑱" },
  { Char: "ice", En: [/aye/g, /[i]+[a-z]+[e]/g, /I/g], Key: "A", Code: 0, SCode: 56434, Shav: "𐑲" },
  { Char: "up", En: [/u/g], Key: "U", Code: 117, SCode: 56435, Shav: "𐑳" },
  { Char: "oak", En: [], Key: "O", Code: 0, SCode: 56436, Shav: "𐑴" },
  { Char: "ooze", En: [/oo/g], Key: "Q", Code: 0, SCode: 56437, Shav: "𐑵" },
  { Char: "oil", En: [/oi/g, /oy/g], Key: "D", Code: 0, SCode: 56438, Shav: "𐑶" },
  { Char: "awe", En: [/aw/g], Key: "G", Code: 0, SCode: 56439, Shav: "𐑷" },
  { Char: "are", En: [/ar/g], Key: "z", Code: 0, SCode: 56440, Shav: "𐑸" },
  { Char: "or", En: [], Key: "x", Code: 0, SCode: 56441, Shav: "𐑹" },
  { Char: "air", En: [], Key: "c", Code: 0, SCode: 56442, Shav: "𐑺" },
  { Char: "err", En: [], Key: "v", Code: 0, SCode: 56443, Shav: "𐑻" },
  { Char: "array", En: [/ar/g], Key: "b", Code: 0, SCode: 56444, Shav: "𐑼" },
  { Char: "ear", En: [], Key: "", Code: 0, SCode: 56445, Shav: "𐑽" },
  { Char: "ian", En: [/ian/g], Key: "n", Code: 0, SCode: 56446, Shav: "𐑾" },
  { Char: "yew", En: [/U/g], Key: "", Code: 0, SCode: 56447, Shav: "𐑿" },
  { Char: "dot", En: [/\.\*/g], Key: "", Code: 0, SCode: 56447, Shav: "·" },
];

export default function Shavian() {
  const [ShavText, setShavText] = useState<string>("");
  const [Shift, setShift] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey) setShift(() => true);
      // if (e.key == "." && e.ctrlKey) return ShavPressed("·");
      if (e.key == "." && e.ctrlKey) return setShavText((S) => `${S}·`);
      if (e.key === "Backspace")
        return setShavText((S) => {
          const Char = S.substring(S.length - 2);
          const Shav = ShavMap.filter((S) => S.Shav === Char);
          return S.substring(0, S.length - (Shav.length > 0 ? 2 : 1));
        });
    });
    document.addEventListener("keyup", (e) => {
      if (!e.shiftKey) setShift(() => false);
    });
    document.addEventListener("keypress", (e) => {
      const Shav = ShavMap.filter((S) => S.Key === e.key);
      if (Shav.length > 0) return setShavText((S) => `${S}${Shav[0].Shav}`);
      if (!["Backspace"].includes(e.key)) return setShavText((S) => `${S}${e.key}`);
    });
    return () => {
      document.removeEventListener("keydown", (e) => {});
      document.removeEventListener("keyup", (e) => {});
      document.removeEventListener("keypress", (e) => {});
    };
  }, []);

  const ShowKey = (Index: number, AltRow: boolean) => {
    return !(
      ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 40, 42, 44, 46].includes(Index) &&
        !AltRow) ||
      ([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 43, 45, 47].includes(
        Index
      ) &&
        Shift) ||
      Index === 48
    );
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-10 gap-2">
        {ShavMap.sort((a, b) => a.SCode - b.SCode).map((Shav, Index) => (
          <Button
            key={Shav.Shav}
            title={Shav.Char}
            onClick={(e) => setShavText((S) => `${S}${Shav.Shav}`)}
            className={`${ShowKey(Index, Shift) ? "hidden" : "flex flex-col"}`}
          >
            <div>
              {Shav.Shav} {Shav.Key}
            </div>
            <div>{Shav.Char}</div>
          </Button>
        ))}
        <Button onClick={(e) => setShavText("")}>Clear</Button>
      </div>
      <Textarea value={ShavText} className="text-base" />
      <Button onClick={() => navigator.clipboard.writeText(ShavText)} className="w-fit" title="Copy">
        <ContentCopyIcon />
      </Button>
    </div>
  );
}
