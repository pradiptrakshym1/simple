/*
    Git and Github
    git ee version control system che etle k aapde kyare kai file add kari, kyare sema changes karyo etc ne track git thi possible che and aaa aapde system ma install karvu pade che

    evu karvu che k aapde sigup nu form banavyu ema submit button pasi nu biju banta bov var lage eem hoy apde eenu adddhu banavyu hoy pasi aapde pasu button na code ma javu hoy to manually aapde biji file ne delete kariye saiye pan have aapde evu karvu hoy k direct button pasi nan code show na thay to git control no use thay che..

    collabration etle k ek karta vadhu same project par kam kari sake che
    github ma aapde code ne set ne manage ne eevu kari sakiye saiye.. github eee 1 website che
        repository etle k folder

    readme ma aapde aaapda project ni details ne rakhi sakiye saiye...
    changes ne save thay ee commit

    github ma direct commit thay pan git thi aapde add and commit aam 2 step ma karvu pade che 

    have git ne github sathe configure karva mate kevu pade k aapde kaya usename and email ma changes karva che 
    git config --global user.name "pradiptrakshym1"
    git config --global user.email "pradip.trks017@gmail.com"
    git config --list

        credential.helper aa apn ne aapda usename and email ni amuk info aape che
    
    aaa badha command aapde vs code na terminal ma lakhi sakiye saiye..

    Local and remote em be hoy che jya clone etle k local etle laptop or aapdu machine and remote etle k github 

    clone ma aapda github ni repo ne aapde aaapda system ma copy karvi hoy to

    tyar bad ek command aave git status eee check kare aapda code nu atyare shu status che ee aaapde changes karya hoy ee badhi files show thay che etle k aapde file ma kai pan changes kari to aapde 2 changes karvu pade che 1 to add(staging ma mukvu pade) and commit (save) karvu pade che

        git ma mainly 4 parkar ni files hoy che 
            1]. untracked => git ne khbr nathi aapde navi file add kari che ee
            2]. modified => aapde aapdi file ma kaik changes karya hoy to ee modified bani jay che  
            3]. staged => file commit karva mate taiyar che eee badhi files k je staged kareli che khali commit j baki che ..
            4]. unmodified => aapde aapdi file ma kai changes na karyu hoy to etle k commit thaya pasi aa stage ma aavi jase ..

        add karva(staged ma lai java mate) => git add [file name] / git add .
        commit karva mate => git commit -m "msg" [ msg ne kaik meaning full rakhvo ..]

        have msg aavi jase k ketli files ma changes thayu ne ee badhu pan github ma aapn ne changes show nai thay eena mate aapde 

            git push origin main => etle k local mathi github ma push kari didhu or
            git push -f origin main kari devu ...
                git push etle to khbr che k aapde git ne push kari saiye pan origin etle k local mathi global ma send kariye saiye tene 1 name aapi didhu che k origin biju kai pan name rakhi sakiye saiye.. 
                and main etle k branch che je aaapn ne github ma pan show thay che upar tabs ma..

        mote bhage aapde aapdi jate folder create kari teni andar pelle thi scratch code lakhiye saiye tena mate
        direct new folder github ma create kari to aapn ne code male j che ene copy paste kari devo ..
            git init => aana thi have jete folder ma git handle kari sakse ...
            git remote add origin <folder link> => aana thi remote ne local sathe access kari sakiye saiye..
            git remote -v => kaya remote ni vat kari saiye eee ek var verify kari sakiye saiye..
            git branch => etle k atyare aapde kayi branch par saiye te (etle k feature1 kaik alag kam kare che feature2 kaik alag kam kare to te bey ne alag alag branch banavi devay che jethi pasi merge kari sakiye saiye..)
            git branch -M "branch_name" => aana thi aapde rename kari sakiye saiye current branch na name ne 

            git push -u origin main => aana thi aapde git ne aki didhu k default push origin main ma j karjo pasi aapde khali git push j lakhva nu and pasu change karvu hoy jyare to khali git push -u f1 feature1 aaa rite karvu ..


            branch kaik aa rite pan kahi sakay
                        C -> D -> --\
            A -> B -> E -> F -> G -> H

            aaam main branch A B hati pasi aapde kaik change karvu che thoda time mate to C D banavyu pasi main branch jyare aaakhu bani jay ready thay jay to aapde pasu ABEFGH ne merge kari deva nu CD sathe

            etle k badha devloper potpotani copy par kam karva nu start kari dey che pasi main j copy hoy che ema merge kari dey che
            have aama ghana badha command pan che
                git checkout <branchName> => etle k 1 branch mathi biji branch ma change karva nu
                git checkout -b <branchName> => aana thi new branch aapde create kari sakiye saiye...

            
                aaam aapde main ma je kai changes kariye eee branch1 branch ne kai khbr padti nathi
*/


import React from 'react'

function Github() {
  return (
    <>
    
    </>
  )
}

export default Github