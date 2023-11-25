const subjects = [{ code: "CMSC 100" }, { code: "CMSC 23" }];

export default function Subjects() {
    return (
        <>
            <ol>
                {subjects.map((subject, i) => (
                    <li key={i}>{subject.code}</li>
                ))}
            </ol>
        </>
    );
}
